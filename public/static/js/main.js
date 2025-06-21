// Main JavaScript file for common functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize any active forms
    initForms();
});

// Mobile menu toggle functionality
// Add this after sidebar and menu-toggle code is initialized

function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    const sidebar = document.querySelector('.sidebar');
    // Add an overlay for menu on mobile
    let sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (!sidebarOverlay) {
        sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = 'sidebar-overlay';
        document.body.appendChild(sidebarOverlay);
    }

    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
        sidebar.classList.toggle('active');
        sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    });

    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        document.body.classList.remove('menu-open');
        sidebarOverlay.style.display = 'none';
    });

    document.body.appendChild(menuToggle);

    // Close menu on resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
            sidebarOverlay.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
        
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function() {
            tooltip.classList.add('show');
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
}

// Initialize forms with validation
function initForms() {
    const forms = document.querySelectorAll('form:not(.no-js)');
    
    forms.forEach(form => {
        // Add novalidate to prevent default HTML5 validation
        form.setAttribute('novalidate', '');
        
        // Add submit event listener
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Show validation errors
                showFormErrors(form);
            }
            
            form.classList.add('was-validated');
        });
        
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.willValidate) {
                    validateField(this);
                }
            });
            
            // Handle blur for better UX
            input.addEventListener('blur', function() {
                if (this.willValidate) {
                    validateField(this);
                }
            });
        });
    });
}

// Show form validation errors
function showFormErrors(form) {
    const invalidFields = form.querySelectorAll(':invalid');
    
    invalidFields.forEach(field => {
        // Skip if field is not in the viewport
        if (!isInViewport(field)) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Add error class to parent
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');
            
            // Remove error class when field is valid
            field.addEventListener('input', function() {
                if (this.checkValidity()) {
                    formGroup.classList.remove('has-error');
                }
            });
        }
    });
    
    // Show first error message
    if (invalidFields.length > 0) {
        const firstInvalid = invalidFields[0];
        firstInvalid.focus();
        
        showNotification('Please fill in all required fields correctly.', 'error');
    }
}

// Validate single form field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    
    if (!formGroup) return;
    
    if (field.checkValidity()) {
        formGroup.classList.remove('has-error');
    } else {
        formGroup.classList.add('has-error');
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    void notification.offsetWidth;
    
    notification.classList.add('show');
    
    // Auto-remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for tooltips
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
.tooltip {
    position: absolute;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

/* Position tooltip above the element */
[data-tooltip] {
    position: relative;
    display: inline-block;
}

[data-tooltip] .tooltip {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
}

[data-tooltip] .tooltip.show {
    transform: translateX(-50%) translateY(0);
}
`;

document.head.appendChild(tooltipStyles);

// Add CSS for resize animation stopper
const resizeAnimationStyles = document.createElement('style');
resizeAnimationStyles.textContent = `
.resize-animation-stopper * {
    animation: none !important;
    transition: none !important;
}
`;

document.head.appendChild(resizeAnimationStyles);

// Add CSS for form validation
const formValidationStyles = document.createElement('style');
formValidationStyles.textContent = `
.form-group {
    position: relative;
}

.form-group.has-error input,
.form-group.has-error select,
.form-group.has-error textarea {
    border-color: var(--error-color) !important;
    padding-right: 2.5rem;
}

.form-group.has-error::after {
    content: '!';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: var(--error-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
}

.form-group .error-message {
    display: none;
    color: var(--error-color);
    font-size: 0.8rem;
    margin-top: 5px;
}

.form-group.has-error .error-message {
    display: block;
}
`;

document.head.appendChild(formValidationStyles);
