// Forbidden.tsx
import { Link } from 'react-router-dom'

const Forbidden = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! This page doesn’t exist.</p>
      <Link to="/">Go back to Homepage</Link>
    </div>
  )
}

export default Forbidden
