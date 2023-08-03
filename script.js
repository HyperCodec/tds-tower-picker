const starterTowers = [
    "scout",
    "sniper",
    "paintballer",
    "demoman",
    "soldier",
    "freezer",
    "hunter"
]

const intermediateTowers = [
    "crook boss",
    "medic",
    "ace pilot",
    "farm",
    "militant",
    "pyromancer",
    "military base",
    "shotgunner",
    "rocketeer"
]

const advancedTowers = [
    "cowboy",
    "mortar",
    "turret",
    "pursuit",
    "electroshocker",
    "commander",
    "dj booth",
    "warden",
    "minigunner",
    "ranger"
]

const hardcoreTowers = [
    "accelerator",
    "engineer"
]

const exclusiveTowers = [
    "gladiator",
    "commando",
    "slasher",
    "frost blaster",
    "archer",
    "swarmer",
    "toxic gunner",
    "sledger",
    "executioner",
    "elf camp"
]

const golden = [
    "scout",
    "soldier",
    "crook boss",
    "pyro",
    "cowboy",
    "minigunner",
    "pyromancer"
]

// code
var currentLoadout = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("changeSlot").addEventListener("keyup", e => {
        if(e.key !== "Enter") return;
        document.getElementById("changeSlotBtn").click();
    });
});

function displayLoadout(highlight) {
    let div = document.getElementById("loadout");

    div.innerHTML = '';

    currentLoadout.slice().reverse().forEach((t, i) => {
        let p = document.createElement("p");

        p.textContent = t;
        if(highlight == 4-i) {
            p.style.color = "white";
        }
        
        div.appendChild(p);
    });
    
    document.getElementById("loadout").classList.remove("hidden");
}

function genLoadout() {
    // clear loadout
    currentLoadout = [];
    
    const towerPool = getTowerPool();

    if(towerPool.length < 5) {
        alert("Not enough towers are enabled for a full loadout");
        return;
    }
    
    while(currentLoadout.length < 5) {
        currentLoadout.push(getTower(towerPool));
    }

    displayLoadout(0);
    
    document.getElementById("replaceTowerContainer").classList.remove("hidden");
    document.getElementById("changeSlot").value = 1;
}

function replaceTower(i) {
    currentLoadout[i] = getTower(getTowerPool());
    displayLoadout(document.getElementById("changeSlot").value - 1);
}

function getTower(pool) {
    const tower = chooseUntilNew(pool, currentLoadout, true);

    if(golden.includes(tower) && document.getElementById("goldenTowers").checked) {
        if(Math.random() >= 0.5) return tower + " (golden)";
        return tower + " (normal)";
    }

    return tower;
}

function getTowerPool() {
    var towerPool = [];

    if(document.getElementById("starterTowers").checked) {
        towerPool.push(...starterTowers);
    }

    if(document.getElementById("intermediateTowers").checked) {
        towerPool.push(...intermediateTowers);
    }

    if(document.getElementById("advancedTowers").checked) {
        towerPool.push(...advancedTowers);
    }

    if(document.getElementById("hardcoreTowers").checked) {
        towerPool.push(...hardcoreTowers);
    }

    if(document.getElementById("exclusiveTowers").checked) {
        towerPool.push(...exclusiveTowers);
    }

    return towerPool;
}

// util
function randChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function chooseUntilNew(arr, used, first = false) {
    if(first) {
        used = used.map(t => t.split(' ')[0]);
        arr = arr.map(t => t.split(' ')[0]);
    }
    
    while(true) {
        const choice = randChoice(arr);

        if(!used.includes(choice)) return choice;
    }
}
