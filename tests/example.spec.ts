import { test, expect } from '@playwright/test';

test.setTimeout(180000);
test('test', async ({ page }) => {
  await page.goto('https://ncc-react-training.vercel.app/auth/sign-in');
  await page.getByRole('textbox', { name: 'email or username' }).click();
  await page.getByRole('textbox', { name: 'email or username' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Login' }).click();
  await page.getByRole('textbox', { name: 'email or username' }).click();
  await page
    .getByRole('textbox', { name: 'email or username' })
    .fill('admindev');
  await page.getByRole('textbox', { name: 'email or username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('123qwe');
  await page.getByRole('checkbox', { name: 'Keep me sign in' }).check();
  await page.getByRole('checkbox', { name: 'Keep me sign in' }).uncheck();
  await page.getByRole('checkbox', { name: 'Keep me sign in' }).check();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/app\/home/, { timeout: 30000 });
  await page.getByRole('button', { name: 'Projects' }).click();
  await page.getByText('New ProjectActive Projects (').click();
  await page.getByRole('button', { name: 'New Project' }).click();
  await page.getByRole('button', { name: 'New Client' }).click();
  const id = Date.now();
  const clientName = `client-${id}`;
  const clientCode = `code-${id}`;
  const projectName = `project-${id}`;
  const projectCode = `${id}`;
  await page.getByRole('textbox', { name: 'Enter client name' }).click();
  await page.getByRole('textbox', { name: 'Enter client code' }).click();
  await page.getByRole('textbox', { name: 'Enter client name' }).click();
  await page
    .getByRole('textbox', { name: 'Enter client name' })
    .fill(clientName);
  await page.getByRole('textbox', { name: 'Enter client code' }).click();
  await page
    .getByRole('textbox', { name: 'Enter client code' })
    .fill(clientCode);
  await page.getByRole('textbox', { name: 'Enter address' }).click();
  await page.getByRole('textbox', { name: 'Enter address' }).fill('test');
  await page.getByRole('button', { name: 'Save' }).click();
  // await page.pause();
  await expect(page.getByRole('button', { name: 'Open' })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('combobox', { name: 'Choose a client...' }).click();
  await page
    .getByRole('combobox', { name: 'Choose a client...' })
    .fill(clientName);
  await page.getByText(clientName).first().click();
  await page.getByRole('textbox', { name: 'Project name' }).click();
  await page.getByRole('textbox', { name: 'Project name' }).fill(projectName);
  await page.getByRole('textbox', { name: 'Project code' }).click();
  await page.getByRole('textbox', { name: 'Project code' }).fill(projectCode);
  await page.locator('input[name="timeStart"]').fill('2026-06-08');
  await page.locator('input[name="timeEnd"]').fill('2026-06-25');
  await page.locator('textarea[name="note"]').click();
  await page.locator('textarea[name="note"]').fill('test playwright');
  await page
    .getByRole('checkbox', { name: 'Auto add user as a member of' })
    .check();
  await page.getByRole('button', { name: 'T&M' }).click();
  await page.getByRole('tab', { name: 'Team' }).click();
  await page.getByRole('tab', { name: 'General' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('tab', { name: 'Team' }).click();
  await page.getByRole('button', { name: 'Add users' }).click();
  await page.locator('div').filter({ hasText: 'Create' }).nth(1).click();
  await page
    .locator('div')
    .filter({ hasText: 'Selected memberShow deactive' })
    .nth(3)
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Tiến Phạm MạnhHN5Stafftien\.pham@ncc\.asia$/ })
    .first()
    .click();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('option', { name: 'SG1' }).click();
  await page
    .locator('div')
    .filter({ hasText: /^Dương Nguyễn ĐạiSG1Staffduong\.nguyen@ncc\.asia$/ })
    .first()
    .click();
  await page.getByText('All').click();
  await page.getByRole('option', { name: 'Internship' }).click();
  await page.getByText('Duoc Phung Van').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Member').nth(2).click();
  await page.getByRole('option', { name: 'PM' }).click();
  await page
    .getByRole('textbox', { name: 'Search by name, email' })
    .nth(1)
    .click();
  await page
    .getByRole('textbox', { name: 'Search by name, email' })
    .nth(1)
    .fill('');
  await page
    .getByRole('textbox', { name: 'Search by name, email' })
    .first()
    .click();
  await page
    .getByRole('textbox', { name: 'Search by name, email' })
    .first()
    .fill('');
  await page.getByText('Official').first().click();
  await page.getByRole('option', { name: 'Official' }).click();
  await page.getByText('Official').nth(1).click();
  await page.getByRole('option', { name: 'Temp' }).click();
  await page.getByText('Official').nth(1).click();
  await page.getByRole('option', { name: 'Temp' }).click();
  await page.getByText('Temp').first().click();
  await page.getByRole('option', { name: 'Official' }).click();
  await page.getByText('Member').nth(2).click();
  await page.getByRole('option', { name: 'Deactive' }).click();
  await page.getByRole('checkbox', { name: 'Show deactive member' }).check();
  await page.getByText('Deactive', { exact: true }).click();
  await page.getByRole('option', { name: 'Member' }).click();
  await page.getByRole('tab', { name: 'Task' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('ascv').click();
  await page.getByText('Business AnalyzingOther Task').click();
  await page.getByRole('checkbox').nth(2).uncheck();
  await page.getByText('Customer SupportingOther Task').click();
  await page.getByRole('checkbox').nth(2).check();
  await page.getByRole('tab', { name: 'Notification' }).click();
  await page.getByRole('textbox', { name: 'Komu Channel Id' }).click();
  await page
    .getByRole('textbox', { name: 'Komu Channel Id' })
    .fill('komu-id-02');
  await page.getByRole('checkbox', { name: 'Submit timesheet' }).check();
  await page
    .getByRole('checkbox', {
      name: 'Request Off/Remote/Onsite/Đi muộn, về sớm',
      exact: true,
    })
    .check();
  await page
    .getByRole('checkbox', { name: 'Approve/Reject Request Off/' })
    .check();
  await page
    .getByRole('checkbox', { name: 'Request Change Working Time' })
    .check();
  await page
    .getByRole('checkbox', { name: 'Approve/Reject Change Working' })
    .check();
  await page.getByRole('tab', { name: 'General' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .click();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill(clientName);
  await page.getByRole('button', { name: clientName }).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.locator('.MuiBackdrop-root').dblclick();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .click();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill(clientName);
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .click();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill('');
  await page.getByRole('button', { name: /Active Projects/ }).click();
  await page.getByText(/Deactive Projects/).click();
  await page.getByRole('button', { name: /Deactive Projects/ }).click();
  await page.getByText(/All Projects/).click();
  await page.getByRole('button', { name: /All Projects/ }).click();
  // await page.pause();
  await page.getByText(/Active Projects/).click();
  await expect(page.getByText(/Deactive Projects/)).toBeHidden();

  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill(clientName);
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill(clientName);
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByText('Deactive').click();
  // await page.pause();
  await page.getByRole('button', { name: 'Deactive' }).click();
  await page.getByRole('button', { name: /Active Projects/ }).click();
  await page.getByText(/Deactive Projects/).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByText('Active', { exact: true }).click();
  await page.getByRole('button', { name: 'Active' }).click();
  await page.getByRole('button', { name: /Deactive Projects/ }).click();
  await page.getByText(/Active Projects/).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByText('Edit').click();
  await page.getByRole('tab', { name: 'Team' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
  await page.getByRole('tab', { name: 'Task' }).click();
  await page.getByText('Human Resource ManagementOther Task').click();
  await page.getByRole('tab', { name: 'General' }).click();
  await page.getByRole('textbox', { name: 'Project name' }).click();
  // await page.getByRole('textbox', { name: 'Project name' }).fill('newPlayWrighttestedited');
  await page.getByRole('textbox', { name: 'Project code' }).click();
  await page.locator('input[name="timeEnd"]').fill('2026-07-03');
  await page.locator('input[name="timeStart"]').fill('2026-06-14');
  await page.getByRole('button', { name: 'NoSalary' }).click();
  await page.getByRole('tab', { name: 'Team' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  // await page.pause();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByText('View', { exact: true }).click();
  await page.getByRole('tab', { name: 'Team' }).click();
  await page.getByRole('tab', { name: 'Tasks' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button').first().click();
  await page.getByRole('button').first().click();
  await page.getByText('Week', { exact: true }).click();
  await page.getByRole('option', { name: 'Month' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .dblclick();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .dblclick();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .dblclick();
  await page
    .locator('div')
    .filter({ hasText: 'Month: 1 - 30 Jun' })
    .nth(1)
    .dblclick();
  await page.getByRole('button', { name: 'Export' }).click();
  await page.getByText('Month', { exact: true }).click();
  await page.getByRole('option', { name: 'All Time' }).click();
  // await page.locator('div').filter({ hasText: 'All TimeAll' }).nth(1).dblclick();
  // await page.locator('div').filter({ hasText: 'All TimeAll' }).nth(1).dblclick();
  // await page.locator('div').filter({ hasText: 'All TimeAll' }).nth(1).dblclick();
  // await page.locator('div').filter({ hasText: 'All TimeAll' }).nth(1).dblclick();
  // await page.locator('div').filter({ hasText: 'All TimeAll' }).nth(1).dblclick();
  await page
    .locator('div')
    .filter({ hasText: 'All TimeAll' })
    .nth(1)
    .dblclick();
  await page.getByRole('button', { name: 'Export' }).click();

  await page.mouse.click(10, 10);

  await expect(page.locator('[role="dialog"]')).toBeHidden();

  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByText('Delete').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .dblclick();
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .press('Enter');
  await page
    .getByRole('textbox', { name: 'Search by client or project' })
    .fill('');
  await page
    .locator('div')
    .filter({ hasText: /^Manage Projects$/ })
    .click();
  await page.getByRole('button', { name: 'My timesheets' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});
