import { test, expect, type Page } from '@playwright/test'

async function dismissOverlayIfPresent(page: Page) {
  // The KeyboardHintsOverlay may appear on first load
  // Dismiss it by pressing any key or clicking dismiss button
  const dismissButton = page.locator('button', { hasText: /dismiss|got it|close/i })
  try {
    await dismissButton.click({ timeout: 1500 })
  } catch {
    // Overlay not present or already dismissed — press Escape as fallback
    await page.keyboard.press('Escape')
  }
  await page.waitForTimeout(300)
}

async function waitForSlideContent(page: Page) {
  await page.waitForSelector('.markdown-content', { state: 'visible', timeout: 5000 })
}

test.describe('Presentation app loads', () => {
  test('renders the first slide with welcome content', async ({ page }) => {
    await page.goto('/')
    await waitForSlideContent(page)
    const slide = page.locator('.markdown-content')
    await expect(slide).toContainText('Welcome to Markdown Slides')
  })

  test('shows progress indicator', async ({ page }) => {
    await page.goto('/')
    await waitForSlideContent(page)
    const progress = page.getByText(/1\s*\/\s*\d+/)
    await expect(progress).toBeVisible()
  })

  test('shows navigation controls', async ({ page }) => {
    await page.goto('/')
    await waitForSlideContent(page)
    const nextButton = page.getByLabel('Next slide')
    const prevButton = page.getByLabel('Previous slide')
    await expect(nextButton).toBeVisible()
    await expect(prevButton).toBeVisible()
  })
})

test.describe('Keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForSlideContent(page)
    await dismissOverlayIfPresent(page)
  })

  test('ArrowRight advances to next slide', async ({ page }) => {
    await expect(page.locator('.markdown-content')).toContainText('Welcome to Markdown Slides')

    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(600)

    await expect(page.locator('.markdown-content')).toContainText('What Makes This Special')
  })

  test('ArrowLeft goes to previous slide', async ({ page }) => {
    // Go forward first
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(600)
    await expect(page.locator('.markdown-content')).toContainText('What Makes This Special')

    // Then go back
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(600)
    await expect(page.locator('.markdown-content')).toContainText('Welcome to Markdown Slides')
  })

  test('Space advances to next slide', async ({ page }) => {
    await page.keyboard.press('Space')
    await page.waitForTimeout(600)
    await expect(page.locator('.markdown-content')).toContainText('What Makes This Special')
  })

  test('cannot go before first slide', async ({ page }) => {
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(300)
    await expect(page.locator('.markdown-content')).toContainText('Welcome to Markdown Slides')
  })
})

test.describe('Dialog shortcuts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForSlideContent(page)
    await dismissOverlayIfPresent(page)
  })

  test('T key opens theme selector', async ({ page }) => {
    await page.keyboard.press('t')
    await page.waitForTimeout(500)

    // Theme selector uses a popover or dialog
    const themeUI = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]')
    await expect(themeUI.first()).toBeVisible({ timeout: 3000 })
  })

  test('S key opens slides list overlay', async ({ page }) => {
    await page.keyboard.press('s')
    await page.waitForTimeout(500)

    // Slides list has a search input
    const searchInput = page.locator('input[placeholder*="earch"], input[type="text"]')
    await expect(searchInput.first()).toBeVisible({ timeout: 3000 })
  })

  test('O key opens file selector', async ({ page }) => {
    await page.keyboard.press('o')
    await page.waitForTimeout(500)

    await expect(page.locator('text=Open Markdown File')).toBeVisible({ timeout: 3000 })
  })

  test('? key opens commands list', async ({ page }) => {
    await page.keyboard.press('?')
    await page.waitForTimeout(500)

    // Commands dialog should show keyboard shortcut descriptions
    await expect(page.locator('text=Keyboard Shortcuts')).toBeVisible({ timeout: 3000 })
  })
})
