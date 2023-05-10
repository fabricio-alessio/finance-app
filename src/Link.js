
export default function Link({ label, onLinkClick }) {
    return (
      <a
        onClick={event => onLinkClick(event)}
        href="#"
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </a>
    )
  }