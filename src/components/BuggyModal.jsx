import { useEffect, useId, useRef } from 'react'

export default function BuggyModal({ title, children, open, onClose }) {
  const titleId = useId()
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        <h2 id={titleId}>{title}</h2>
        {children}
      </section>
    </div>
  )
}
