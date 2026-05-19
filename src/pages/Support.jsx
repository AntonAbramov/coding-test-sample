import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function Support() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Client cannot export report', priority: 'High' },
    { id: 2, title: 'Invoice duplicate after refresh', priority: 'Medium' },
    { id: 3, title: 'Mobile menu overlaps content', priority: 'Low' }
  ])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function addTicket(event) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError('Enter a ticket title before submitting.')
      return
    }
    setTickets((current) => [{ id: Date.now(), title: trimmed, priority: 'Low' }, ...current])
    setTitle('')
    setError('')
  }

  return (
    <>
      <PageHeader eyebrow="Helpdesk" title="Support" description="Ticket creation and triage for customer issues." />
      <article className="panel support-guide">
        <h2>How tickets work</h2>
        <p>
          Use the composer below to log a new issue. Each ticket is triaged by priority so the team can respond in the
          right order.
        </p>
        <ul>
          <li><strong>High</strong> — production outages or blocked revenue.</li>
          <li><strong>Medium</strong> — degraded experience with a workaround.</li>
          <li><strong>Low</strong> — polish, questions, or non-urgent improvements.</li>
        </ul>
      </article>
      <form className="panel ticket-composer" onSubmit={addTicket}>
        <label className="sr-only" htmlFor="ticket-title">New ticket title</label>
        <input
          id="ticket-title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          placeholder="New ticket title"
        />
        <button type="submit" disabled={!title.trim()}>Add ticket</button>
      </form>
      {error && <p className="field-error">{error}</p>}
      <section className="ticket-list" aria-label="Support tickets">
        {tickets.map((ticket) => (
          <article className="ticket" key={ticket.id}>
            <strong>{ticket.title}</strong>
            <span>{ticket.priority}</span>
          </article>
        ))}
      </section>
    </>
  )
}
