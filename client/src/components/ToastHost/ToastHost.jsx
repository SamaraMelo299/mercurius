import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'
import './ToastHost.css'

function ToastIcon({ type }) {
    if (type === 'success') return <FiCheckCircle />
    if (type === 'danger') return <FiAlertCircle />
    return <FiInfo />
}

function ToastHost({ toasts }) {
    return (
        <div className="toast-host" aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast--${toast.type}`}>
                    <div className="toast__icon">
                        <ToastIcon type={toast.type} />
                    </div>

                    <div className="toast__content">
                        <strong className="toast__title">{toast.title}</strong>
                        {toast.message ? (
                            <span className="toast__message">{toast.message}</span>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ToastHost