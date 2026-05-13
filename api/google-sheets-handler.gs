// ═══════════════════════════════════════════════════════════
// NEXAURO — Google Apps Script for Lead Storage + Email
// ═══════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into the editor
// 3. Click Deploy > New Deployment > Web App
// 4. Set "Execute as" = "Me" and "Who has access" = "Anyone"
// 5. Click Deploy and copy the Web App URL
// 6. Paste that URL into js/contact.js (GOOGLE_SCRIPT_URL variable)
// 7. Create a Google Sheet named "NEXAURO Leads" in your Google Drive
// 8. Copy the Sheet ID from the URL and paste it below
//
// The sheet will auto-create headers on first submission.
// ═══════════════════════════════════════════════════════════

// REPLACE with your actual Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'aman310762@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Open or create sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Business Name',
        'Phone',
        'Email',
        'Industry',
        'Package',
        'Monthly Revenue',
        'Message',
        'WhatsApp Preference',
        'Source'
      ]);
      // Format header row
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Add lead row
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.business || '',
      data.phone || '',
      data.email || '',
      data.industry || '',
      data.package || '',
      data.revenue || '',
      data.message || '',
      data.whatsapp || 'No',
      'Website Form'
    ]);
    
    // Send email notification
    sendLeadEmail(data, timestamp);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'NEXAURO Lead API' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendLeadEmail(data, timestamp) {
  const packageName = data.package || 'General';
  const subject = `New NEXAURO Lead — ${packageName} Package Inquiry`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0F2B47; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #D4AF37; font-size: 24px; margin: 0;">NEXAURO</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">New Lead Notification</p>
      </div>
      
      <div style="background: #ffffff; padding: 32px; border: 1px solid #eee; border-top: none;">
        <h2 style="color: #0F2B47; font-size: 18px; margin: 0 0 20px;">
          📋 New ${packageName} Package Inquiry
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px; width: 140px;">Full Name</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">${data.name || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Business Name</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">${data.business || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Phone</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">
              <a href="tel:${data.phone}" style="color: #00B4D8; text-decoration: none;">${data.phone || '—'}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Email</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">
              <a href="mailto:${data.email}" style="color: #00B4D8; text-decoration: none;">${data.email || '—'}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Industry</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">${data.industry || '—'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Package</td>
            <td style="padding: 12px 0; color: #D4AF37; font-weight: 700; font-size: 15px;">${packageName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">Monthly Revenue</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">${data.revenue || 'Not specified'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 0; color: #7F8C8D; font-size: 13px;">WhatsApp</td>
            <td style="padding: 12px 0; color: #2C3E50; font-weight: 600;">${data.whatsapp === 'Yes' ? '✅ Yes' : '❌ No'}</td>
          </tr>
        </table>
        
        ${data.message ? `
        <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 3px solid #D4AF37;">
          <p style="color: #7F8C8D; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
          <p style="color: #2C3E50; font-size: 14px; line-height: 1.6; margin: 0;">${data.message}</p>
        </div>` : ''}
        
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
          <p style="color: #7F8C8D; font-size: 12px; margin: 0;">
            📅 Received: ${timestamp}<br>
            🌐 Source: nexauro.in Contact Form
          </p>
        </div>
      </div>
      
      <div style="background: #0F2B47; padding: 16px 32px; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">NEXAURO Lead Management System</p>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: 'NEXAURO Leads'
  });
}
