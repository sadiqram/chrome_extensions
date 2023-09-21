
import axios from 'axios';
import { DateTime } from 'luxon';
// const axios = require('axios');
// const { DateTime } = require('luxon');

//API endpoint
const url = 'https://data.nba.com/data/5s/json/cms/noseason/scoreboard/{date}/games.json';

//Current date format YYYYMMDD
const today = DateTime.local().toFormat('yyyyMMdd');
const url_with_today_date = url.replace('{date}', today);

async function GetScoreBoard() {
    try {
        const res = await axios.get(url_with_today_date);
        const scoreboard = res.data;

        console.log('ScoreBoardDate: ' + scoreboard.sports_content.sports_meta.season_meta.calendar_date);

        const games = scoreboard.sports_content.games.game;
        for (const game of games) {
            const gameTimeUTC = game.date + ' ' + game.time;
            const gameTimeLTZ = DateTime.fromISO(gameTimeUTC, { zone: "utc" }).setZone('local');

            console.log(`${game.id}: ${game.visitor.nickname} vs ${game.home.nickname} @ ${gameTimeLTZ.toFormat('yyyy-MM-dd HH:mm:ss')}`);
        }

    } catch (e) {
        console.error('Error Fetching data:', e);
    }
}

GetScoreBoard();