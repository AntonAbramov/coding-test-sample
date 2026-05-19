import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { team } from '../data/mockData.js'

export default function Team({ search = '' }) {
  const [members, setMembers] = useState(team)
  const [showInactive, setShowInactive] = useState(false)
  const query = search.trim().toLowerCase()

  const visible = members.filter((member) => {
    if (!showInactive && !member.active) return false
    if (!query) return true
    const haystack = `${member.name} ${member.role} ${member.location}`.toLowerCase()
    return haystack.includes(query)
  })

  function removeMember(id) {
    setMembers((current) => current.filter((member) => member.id !== id))
  }

  return (
    <>
      <PageHeader eyebrow="People" title="Team capacity" description="Review active team members and workload balance." />
      <label className="toggle-row panel">
        <input
          type="checkbox"
          checked={showInactive}
          onChange={(event) => setShowInactive(event.target.checked)}
        />
        Show inactive
      </label>
      {visible.length === 0 ? (
        <p className="empty-state panel">No team members match your filters.</p>
      ) : (
        <div className="card-grid">
          {visible.map((member) => (
            <article className="person-card" key={member.id}>
              <div className="avatar" aria-hidden="true">{member.name[0]}</div>
              <div>
                <h3>{member.name}</h3>
                <p>{member.role} · {member.location}</p>
                <div className="meter" role="progressbar" aria-valuenow={member.capacity} aria-valuemin={0} aria-valuemax={100} aria-label={`${member.name} capacity`}>
                  <span style={{ width: `${Math.min(member.capacity, 100)}%` }} />
                </div>
                <small>{member.capacity}% allocated</small>
              </div>
              <button type="button" onClick={() => removeMember(member.id)}>Remove</button>
            </article>
          ))}
        </div>
      )}
    </>
  )
}