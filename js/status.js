// Function to fetch data from mcstatus.io API
async function fetchStatus(ip, port, badgeId, countId = null, playersId = null) {
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}:${port}`);
        const data = await response.json();

        const badge = document.getElementById(badgeId);
        
        if (data.online) {
            // Update Badge
            badge.className = 'status-badge online-bg';
            badge.innerHTML = `<div class="dot dot-online"></div><span>ONLINE</span>`;
            
            // Update Player Count
            if (countId) {
                const count = document.getElementById(countId);
                if (count) count.innerText = data.players.online;
            }
            
            // Update Player List
            if (playersId) {
                const players = document.getElementById(playersId);
                if (players) {
                    if (data.players.list && data.players.list.length > 0) {
                        players.innerHTML = data.players.list.map(p => `<span>${p.name_clean}</span>`).join('');
                    } else {
                        players.innerHTML = 'No players online.';
                    }
                }
            }
        } else {
            // Server is offline
            badge.className = 'status-badge offline-bg';
            badge.innerHTML = `<div class="dot dot-offline"></div><span>OFFLINE</span>`;
            
            if (countId) {
                const count = document.getElementById(countId);
                if (count) count.innerText = '0';
            }
            if (playersId) {
                const players = document.getElementById(playersId);
                if (players) players.innerHTML = 'Server offline.';
            }
        }
    } catch (error) {
        console.error("Error fetching status for port " + port, error);
    }
}

// Run on page load
window.onload = () => {
    // Main Proxy (Fetches Total Players)
    fetchStatus('129.154.254.49', '25565', 'main-badge', 'proxy-count');
    
    // Hub (Fetches Players & Names)
    fetchStatus('129.154.254.49', '25566', 'hub-badge', 'hub-count', 'hub-players');
    
    // Survival (Fetches Players & Names)
    fetchStatus('129.154.254.49', '25567', 'survival-badge', 'survival-count', 'survival-players');
};
