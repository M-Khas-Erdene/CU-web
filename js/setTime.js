document.addEventListener('DOMContentLoaded', function () {
    const morning=document.getElementById('morning');
    const afternoon=document.getElementById('afternoon');
    const evening=document.getElementById('evening');
    // Get the current hour
    const currentHour = new Date().getHours();
  
    // Determine the time of day based on the current hour
    let timeOfDay;
    if (currentHour >= 5 && currentHour < 12) {
        timeOfDay = 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = 'afternoon';
    } else {
        timeOfDay = 'evening';
    }
  
    // Update the content based on the time of day
    switch (timeOfDay) {
        case 'morning':
            morning.classList.remove('hide');
            afternoon.classList.add('hide');
            evening.classList.add('hide');
            break;
        case 'afternoon':
            morning.classList.add('hide');
            afternoon.classList.remove('hide');
            evening.classList.add('hide');
            break;
        case 'evening':
            morning.classList.add('hide');
            afternoon.classList.add('hide');
            evening.classList.remove('hide');
            break;
        default:
            break;
    }
  });