const NOTIFICATION_TIMEOUT = 5000;
const NOTIFICATION_OPACITY_TIMEOUT = 250;

function initNotification(text) {
    let notification = document.createElement("div");
    notification.innerHTML = text;
    notification.classList.add("notification")
    setTimeout((notification) => {
        notification.style.opacity = 0;
    }, NOTIFICATION_TIMEOUT - NOTIFICATION_OPACITY_TIMEOUT, notification);
    setTimeout((notification) => {
        notification.remove();
    }, NOTIFICATION_TIMEOUT, notification);
    return notification;
}

function addNotification(notification) {
    document.body.appendChild(notification);
}