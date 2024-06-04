import stylError from './ErrorMessage.module.css'

export default function ErrorMessage() {
  return (
    <p className={stylError.text}>Error during load data, try again later.</p>
  )
}

