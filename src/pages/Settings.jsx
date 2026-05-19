import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    company: 'Northstar',
    timezone: 'Europe/London',
    emails: true,
    density: 'Comfortable'
  })
  const [saved, setSaved] = useState(false)
  const [companyError, setCompanyError] = useState('')

  function save(event) {
    event.preventDefault()
    if (!settings.company.trim()) {
      setCompanyError('Company name is required.')
      return
    }
    setCompanyError('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Settings" description="Company preferences and workspace defaults." />
      <form className="panel settings-form" onSubmit={save}>
        <label htmlFor="company-name">
          Company name
          <input
            id="company-name"
            value={settings.company}
            onChange={(event) => setSettings({ ...settings, company: event.target.value })}
            required
          />
        </label>
        {companyError && <p className="field-error">{companyError}</p>}
        <label htmlFor="timezone">
          Timezone
          <select
            id="timezone"
            value={settings.timezone}
            onChange={(event) => setSettings({ ...settings, timezone: event.target.value })}
          >
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </label>
        <label className="checkbox-line">
          <input
            type="checkbox"
            checked={settings.emails}
            onChange={(event) => setSettings({ ...settings, emails: event.target.checked })}
          />
          Send email reports
        </label>
        <label htmlFor="density">
          Density
          <select
            id="density"
            value={settings.density}
            onChange={(event) => setSettings({ ...settings, density: event.target.value })}
          >
            <option>Compact</option>
            <option>Comfortable</option>
            <option>Spacious</option>
          </select>
        </label>
        <button type="submit" className="primary-btn">Save settings</button>
        {saved && <p className="toast" role="status">Settings saved.</p>}
      </form>
    </>
  )
}
