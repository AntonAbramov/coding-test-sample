import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import BuggyModal from '../components/BuggyModal.jsx'
import { projects, invoices } from '../data/mockData.js'

export default function Dashboard({ search = '' }) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState('Review blocked work, confirm invoices, and update client-facing status.')
  const query = search.trim().toLowerCase()

  const totalBudget = useMemo(() => projects.reduce((sum, project) => sum + project.budget, 0), [])
  const unpaid = invoices.filter((invoice) => !invoice.paid).reduce((sum, invoice) => sum + invoice.amount, 0)
  const avgHealth = Math.round(projects.reduce((sum, project) => sum + project.health, 0) / projects.length)
  const filtered = useMemo(() => {
    if (!query) return projects
    return projects.filter((project) => project.name.toLowerCase().includes(query))
  }, [query])

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Executive Dashboard"
        description="A compact operations dashboard with key project health and billing signals."
        action={<button type="button" className="primary-btn" onClick={() => setOpen(true)}>Create summary</button>}
      />
      <div className="stats-grid">
        <StatCard label="Active projects" value={projects.length} trend={12} />
        <StatCard label="Total budget" value={`£${totalBudget.toLocaleString()}`} trend={-4} />
        <StatCard label="Unpaid invoices" value={`£${unpaid.toLocaleString()}`} trend={8} />
        <StatCard label="Avg health" value={`${avgHealth}%`} trend={-11} />
      </div>
      <div className="content-grid two-col">
        <section className="panel">
          <h2>Project health</h2>
          {filtered.length === 0 ? (
            <p className="empty-state">No projects match your search.</p>
          ) : (
            <div className="health-list">
              {filtered.map((project) => (
                <div className="health-row" key={project.id}>
                  <span>{project.name}</span>
                  <div
                    className="health-bar"
                    role="progressbar"
                    aria-valuenow={project.health}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${project.name} health`}
                  >
                    <i style={{ width: `${project.health}%` }} />
                  </div>
                  <b>{project.health}%</b>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="panel notes-panel">
          <h2>Today</h2>
          <p>Review blocked work, confirm invoices, and update client-facing status.</p>
          <label className="sr-only" htmlFor="daily-notes">Daily notes</label>
          <textarea id="daily-notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
        </section>
      </div>
      <BuggyModal title="Generate summary" open={open} onClose={() => setOpen(false)}>
        <p>Name this summary export for your records.</p>
        <label htmlFor="summary-name">Summary name</label>
        <input id="summary-name" placeholder="Q2 ops review" />
        {/*  TODO: I would add listener and request to BE to generate a report */}
        <button type="button" className="primary-btn">Generate</button>
      </BuggyModal>
    </>
  )
}
