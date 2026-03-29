import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = `file://${path.join(__dirname, 'index.html')}`;

let passed = 0, failed = 0;
function assert(name, condition) {
  if (condition) { console.log(`  PASS: ${name}`); passed++; }
  else { console.log(`  FAIL: ${name}`); failed++; }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.goto(filePath);
  await page.waitForSelector('#rink-canvas');
  await page.waitForTimeout(500);

  // ========== LIBRARY TESTS ==========
  console.log('\n=== LIBRARY TESTS ===');

  // Set up a drill with title and content
  await page.fill('#drill-title', 'Test Drill Alpha');
  await page.waitForTimeout(100);

  // Place a forward
  await page.click('button[data-tool="forward"]');
  const canvas = page.locator('#rink-canvas').first();
  const box = await canvas.boundingBox();
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.waitForTimeout(200);
  await page.keyboard.press('Escape');

  // Switch to library
  await page.click('[data-tab="library"]');
  await page.waitForTimeout(300);

  // T1: Drill appears in library
  const cards = await page.locator('.drill-card').count();
  assert('Drill card exists in library', cards >= 1);

  // T2: Drill title shown
  const cardText = await page.locator('.drill-card').first().textContent();
  assert('Drill title visible in card', cardText.includes('Test Drill Alpha'));

  // T3: Search filters drills
  await page.fill('#library-search', 'Alpha');
  await page.waitForTimeout(300);
  const filteredCards = await page.locator('.drill-card').count();
  assert('Search filters to matching drills', filteredCards >= 1);

  await page.fill('#library-search', 'ZZZZZ_NOMATCH');
  await page.waitForTimeout(300);
  const noCards = await page.locator('.drill-card').count();
  assert('Search with no match shows 0 cards', noCards === 0);

  await page.fill('#library-search', '');
  await page.waitForTimeout(300);

  // T4: New Drill from editor
  await page.click('[data-tab="editor"]');
  await page.waitForTimeout(200);
  await page.click('#btn-new-drill');
  await page.waitForTimeout(300);
  const newTitle = await page.locator('#drill-title').inputValue();
  assert('New Drill clears title', newTitle === '');

  // Set title on new drill
  await page.fill('#drill-title', 'Test Drill Beta');
  await page.waitForTimeout(100);

  // T5: Both drills in library
  await page.click('[data-tab="library"]');
  await page.waitForTimeout(300);
  const twoCards = await page.locator('.drill-card').count();
  assert('Two drills in library', twoCards >= 2);

  // T6: Open drill from library
  const openBtns = page.locator('.drill-card button:has-text("Open")');
  if (await openBtns.count() > 0) {
    await openBtns.first().click();
    await page.waitForTimeout(300);
    const editorActive = await page.locator('#tab-editor').evaluate(el => el.classList.contains('active'));
    assert('Opening drill switches to Editor tab', editorActive);
  }

  // T7: Duplicate drill
  await page.click('[data-tab="library"]');
  await page.waitForTimeout(300);
  const dupBtns = page.locator('.drill-card button:has-text("Duplicate")');
  if (await dupBtns.count() > 0) {
    const beforeCount = await page.locator('.drill-card').count();
    await dupBtns.first().click();
    await page.waitForTimeout(300);
    const afterCount = await page.locator('.drill-card').count();
    assert('Duplicate adds a new drill card', afterCount > beforeCount);
  }

  // T8: Delete drill (double-tap)
  const delBtns = page.locator('.drill-card button:has-text("Delete")');
  if (await delBtns.count() > 0) {
    const beforeDel = await page.locator('.drill-card').count();
    const delBtn = delBtns.last(); // delete the last drill
    await delBtn.click(); // first tap — changes to "Confirm?"
    await page.waitForTimeout(200);
    // Re-locate the confirm button (text changed)
    const confirmBtn = page.locator('.drill-card button:has-text("Confirm")').last();
    if (await confirmBtn.count() > 0) {
      await confirmBtn.click();
      await page.waitForTimeout(500);
    }
    const afterDel = await page.locator('.drill-card').count();
    assert('Delete removes a drill card', afterDel < beforeDel);
  }

  // T9: Category creation
  await page.click('#btn-new-category');
  await page.waitForTimeout(200);
  // A prompt or inline input should appear — check for category sections
  const catSections = await page.locator('.category-section').count();
  assert('Category section exists', catSections >= 1);

  // T10: Thumbnails generated
  await page.waitForTimeout(500);
  const thumbs = await page.locator('.drill-thumb img').count();
  assert('Drill thumbnails generated', thumbs >= 1);

  // ========== PRACTICE PLAN TESTS ==========
  console.log('\n=== PRACTICE PLAN TESTS ===');

  await page.click('[data-tab="practice"]');
  await page.waitForTimeout(300);

  // T11: Practice Plan tab visible
  const practiceVisible = await page.locator('#tab-practice').evaluate(el => el.classList.contains('active'));
  assert('Practice Plan tab active', practiceVisible);

  // T12: Plan title input exists
  const planTitle = page.locator('#practice-title');
  assert('Plan title input exists', await planTitle.count() > 0);

  await planTitle.fill('Test Practice');
  await page.waitForTimeout(100);

  // T13: Add drill to practice
  const drillSelect = page.locator('#practice-add-drill');
  const options = await drillSelect.locator('option').count();
  assert('Drill select has options', options >= 2); // at least "Select..." + 1 drill

  if (options >= 2) {
    // Select by value of second option (first is "Select a drill...")
    const optVal = await drillSelect.locator('option').nth(1).getAttribute('value');
    await drillSelect.selectOption(optVal);
    await page.click('#btn-add-to-practice');
    await page.waitForTimeout(500);
    const entries = await page.locator('.practice-entry').count();
    assert('Drill added to practice plan', entries >= 1);
  }

  // T14: Add break entry
  const addBreakBtn = page.locator('#btn-add-break-to-practice');
  if (await addBreakBtn.count() > 0) {
    await addBreakBtn.click();
    await page.waitForTimeout(500);
  }
  const entriesAfterBreak = await page.locator('.practice-entry').count();
  assert('Break added to practice plan', entriesAfterBreak >= 2);

  // T15: Total duration shown
  const totalEl = page.locator('.practice-total');
  const totalText = (await totalEl.count() > 0) ? await totalEl.textContent() : '';
  assert('Total duration displayed', totalText.includes('Total'));

  // T16: New Plan button
  const newPlanBtn = page.locator('#btn-new-plan');
  if (await newPlanBtn.count() > 0) {
    await newPlanBtn.click();
    await page.waitForTimeout(300);
    const planSelect = page.locator('#practice-plan-select');
    const planCount = await planSelect.locator('option').count();
    assert('New plan created', planCount >= 2);
  }

  // T17: Weekly calendar visible
  const calendar = page.locator('#weekly-calendar');
  assert('Weekly calendar exists', await calendar.count() > 0);

  // T18: Timer button exists
  const timerBtn = page.locator('#btn-start-timer');
  assert('Timer button exists', await timerBtn.count() > 0);

  // ========== RESPONSIVE TESTS ==========
  console.log('\n=== RESPONSIVE TESTS ===');

  // T19: Mobile portrait
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click('[data-tab="editor"]');
  await page.waitForTimeout(300);
  const mobileToolbar = await page.locator('.toolbar').first().boundingBox();
  const mobileCanvas = await page.locator('#rink-canvas').first().boundingBox();
  assert('Mobile toolbar < 35% of viewport', mobileToolbar.height / 844 < 0.35);
  assert('Mobile canvas visible', mobileCanvas.height > 100);

  // T20: Labels hidden on mobile
  const labelVisible = await page.locator('.toolbar-label').first().isVisible();
  assert('Toolbar labels hidden on mobile', !labelVisible);

  // T21: Tablet portrait
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(200);
  const tabletLabel = await page.locator('.toolbar-label').first().isVisible();
  assert('Toolbar labels visible on tablet', tabletLabel);

  // T22: Desktop
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.waitForTimeout(200);
  const desktopCanvas = await page.locator('#rink-canvas').first().boundingBox();
  assert('Desktop canvas > 300px wide', desktopCanvas.width > 300);

  // ========== SUMMARY ==========
  console.log(`\n========== SUMMARY ==========`);
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  console.log(`Overall: ${failed === 0 ? 'ALL PASS' : 'SOME FAILURES'}`);

  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
})();
