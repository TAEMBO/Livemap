import lodash from 'lodash';
import * as utility from '../libraries/utility';

function getPlayers(players) {
    const results = [];
  
    players.forEach(player => {
        if (!lodash.isEmpty(player)) if (player.isUsed) results.push(new Player(player));
    });

    return results;
}

function Player(player) {
    this.name = player.name;
    this.uptime = utility.formatTime(player.uptime as number);
    this.admin = player.isAdmin;
}

export default { getPlayers, Player };