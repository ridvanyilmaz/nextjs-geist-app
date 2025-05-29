// Graph Data
const graphData = {
    labels: ['Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25'],
    values: [22.2, 26.8, 20.4, 23.3, 16.8, 23.8, 33.4, 26.5, 37.3, 40.2, 31.6, 39.0]
};

// Initialize Graph with better styling
function initializeGraph() {
    const canvas = document.getElementById('marketGraph');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size based on container
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth - 48; // Account for padding
    canvas.height = 300;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set styles
    const gridColor = '#E5E7EB';
    const lineColor = '#4169E1';
    const textColor = '#6B7280';
    
    // Calculate scales
    const maxValue = Math.max(...graphData.values) * 1.1; // Add 10% padding
    const minValue = Math.min(...graphData.values) * 0.9; // Add 10% padding
    const padding = 40;
    const graphHeight = height - 2 * padding;
    const graphWidth = width - 2 * padding;
    
    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = height - padding - (graphHeight * (i / 5));
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Draw y-axis labels
        const value = minValue + (maxValue - minValue) * (i / 5);
        ctx.fillStyle = textColor;
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toFixed(1), padding - 10, y);
    }
    
    // Draw x-axis labels and vertical grid lines
    const step = graphWidth / (graphData.labels.length - 1);
    graphData.labels.forEach((label, i) => {
        const x = padding + (step * i);
        
        // Vertical grid lines
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = textColor;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(label, x, height - padding + 10);
    });
    
    // Draw line graph
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    
    graphData.values.forEach((value, i) => {
        const x = padding + (step * i);
        const y = height - padding - ((value - minValue) / (maxValue - minValue) * graphHeight);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw points
    graphData.values.forEach((value, i) => {
        const x = padding + (step * i);
        const y = height - padding - ((value - minValue) / (maxValue - minValue) * graphHeight);
        
        // White background for point
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Point border
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
    });
}

// Tab Switching with animations
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Trigger graph redraw with animation
            initializeGraph();
        });
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Update data and redraw graph
            initializeGraph();
        });
    });
}

// Notes Section with autosave
function initializeNotes() {
    const noteEditor = document.querySelector('.note-editor');
    const saveButton = document.querySelector('.notes-section .btn-save');
    const undoButton = document.querySelector('.notes-section .btn-undo');
    const wordCount = document.querySelector('.word-count');
    let previousContent = noteEditor.innerHTML;
    let timeout;
    
    noteEditor.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            saveButton.style.opacity = '1';
            // Update word count
            const words = noteEditor.textContent.trim().split(/\s+/).filter(word => word.length > 0);
            wordCount.textContent = `${words.length} words`;
        }, 500);
    });
    
    saveButton.addEventListener('click', () => {
        previousContent = noteEditor.innerHTML;
        saveButton.style.opacity = '0.5';
        
        // Show save confirmation
        const timestamp = document.querySelector('.note-footer .timestamp');
        timestamp.textContent = `Last saved: ${new Date().toLocaleTimeString()}`;
    });
    
    undoButton.addEventListener('click', () => {
        noteEditor.innerHTML = previousContent;
        saveButton.style.opacity = '0.5';
        const words = noteEditor.textContent.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = `${words.length} words`;
    });
}

// Action Buttons with feedback
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.querySelector('span').textContent;
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = '', 100);
            console.log(`${action} action triggered`);
        });
    });
}

// Events with expand/collapse
function initializeEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
            const subject = item.querySelector('.event-subject').textContent;
            const time = item.querySelector('.event-time').textContent;
            console.log(`Event: ${subject} at ${time}`);
        });
    });
    
    const addEventButton = document.querySelector('.add-event');
    addEventButton.addEventListener('click', () => {
        addEventButton.style.transform = 'scale(0.95)';
        setTimeout(() => addEventButton.style.transform = '', 100);
        console.log('Add new event clicked');
    });
}

// Risk Level Buttons
function initializeRiskButtons() {
    const riskButtons = document.querySelectorAll('.risk-btn');
    riskButtons.forEach(button => {
        button.addEventListener('click', () => {
            riskButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Stage Selector
function initializeStageSelector() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    stageButtons.forEach(button => {
        button.addEventListener('click', () => {
            stageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Status Selector
function initializeStatusSelector() {
    const statusSelect = document.querySelector('#status');
    statusSelect.addEventListener('change', () => {
        console.log(`Status changed to: ${statusSelect.value}`);
    });
}

// Window resize handler
function handleResize() {
    initializeGraph();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeGraph();
    initializeTabs();
    initializeNotes();
    initializeActionButtons();
    initializeEvents();
    initializeRiskButtons();
    initializeStageSelector();
    initializeStatusSelector();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(handleResize, 250);
    });
});
