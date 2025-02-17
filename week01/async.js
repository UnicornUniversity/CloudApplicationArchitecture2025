let interval = 0;


const timer = setInterval(() => {
    const now = new Date().toISOString();
    interval++;
    console.log(now);
    if (interval === 5){
        clearInterval(timer);
    }
}, 1000);