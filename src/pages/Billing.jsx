import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { invoices } from '../data/mockData.js'

export default function Billing({ search = '' }) {
  const [rows, setRows] = useState(invoices)
  const [discount, setDiscount] = useState('')
  const query = search.trim().toLowerCase()

  const visible = useMemo(() => {
    if (!query) return rows
    return rows.filter((row) =>
      `${row.id} ${row.client}`.toLowerCase().includes(query)
    )
  }, [rows, query])

  const discountAmount = Number.parseFloat(discount) || 0
  const total = Math.max(0, visible.reduce((sum, row) => sum + row.amount, 0) - discountAmount)
  const discountError = discount !== '' && Number.isNaN(Number.parseFloat(discount))

  return (
    <>
      <PageHeader eyebrow="Finance" title="Billing" description="Invoices, payment state, and discount calculations." />
      <section className="panel billing-summary">
        <label htmlFor="billing-discount">
          Discount (£)
          <input
            id="billing-discount"
            type="number"
            min="0"
            inputMode="decimal"
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            placeholder="0"
          />
        </label>
        {discountError && <p className="field-error">Enter a valid number for the discount.</p>}
        <strong aria-live="polite">Total: £{total.toLocaleString()}</strong>
      </section>
      {visible.length === 0 ? (
        <p className="empty-state panel">No invoices match your search.</p>
      ) : (
        <div className="invoice-list">
          {visible.map((invoice) => (
            <article className="invoice-card" key={invoice.id}>
              <div>
                <h3>{invoice.id}</h3>
                <p>{invoice.client}</p>
              </div>
              <strong>£{invoice.amount.toLocaleString()}</strong>
              <span className={invoice.paid ? 'pill paid' : 'pill unpaid'}>{invoice.paid ? 'Paid' : 'Due'}</span>
              <button
                type="button"
                onClick={() =>
                  setRows((current) =>
                    current.map((row) => (row.id === invoice.id ? { ...row, paid: !row.paid } : row))
                  )
                }
              >
                {invoice.paid ? 'Mark unpaid' : 'Mark paid'}
              </button>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
