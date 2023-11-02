import {ref, computed, h} from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'
import { photoFlexLayout } from 'photo-flex-layout';
export const useF365Store = defineStore('f365', {
  state: () => ({
    currentDay: [],
    currentUser: [],
    currentUserLinks: [],
    currentUserStats: {},
    best: [],
    firsters: [],
    searchResults: [],
    stats:{
      'least_participants':[],
      'max_participants':[],
      'longest_streaks':[],
      'days_participants':[],
      'participants':[],
      'most_photos':[],
      'average_upvotes':[],
      'best_works':[],
      'controversial_works':[],
      'worst_works':[],
      'longest_win':[],
      'longest_leader':[],
      'finishers': [],
      'most_leader':[],
      'most_win':[],
      'avgs':{},
    },
    periodStats:{
      'least_participants':[],
      'max_participants':[],
      'longest_streaks':[],
      'days_participants':[],
      'participants':[],
      'most_photos':[],
      'average_upvotes':[],
      'best_works':[],
      'controversial_works':[],
      'worst_works':[],
      'longest_win':[],
      'longest_leader':[],
      'finishers': [],
      'most_leader':[],
      'most_win':[],
      'avgs':{},
    }
  }),
  getters: {
    getFirsters(state) {
      return state.firsters
    },
    getBestImages(state) {
      for (const i in state.best) {
        state.best[i].resizedHeight = Math.floor(state.best[i].height/state.best[i].width*284)
        // @ts-ignore
      }
      return state.best;
    },
    getGlobalStats(state) {
      return state.stats
    },
    getPeriodCachedStats(state) {
      return state.periodStats
    },
    getImagesFromEntries(state) {
      const entries = state.currentDay
      const outer = []
      entries.forEach( element => {
        outer.push({"src": 'https://f365.zyuhel.ru'+element.image_url, original:element, description: element.hash,download: true})
      })
      return outer
    },
    getEntriesForUser(state){
      for (const i in state.currentUser) {
        state.currentUser[i].resizedHeight = Math.floor(state.currentUser[i].height/state.currentUser[i].width*284)
        // @ts-ignore
      }
      return state.currentUser
    },
    getStatsForUser(state){
      return state.currentUserStats
    },
    getLinksForUser(state){
      return state.currentUserLinks
    },
    getEntriesForDay(state){
      return state.currentDay
    },
    getSearchResults(state) {
      return state.searchResults
    }
  },
  actions: {
    async getMost() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_participants')
      this.stats.max_participants = data.rows
    },
    async getLeast() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/least_participants')
      this.stats.least_participants = data.rows
    },
    async getLongest() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/longest')
      this.stats.longest_streaks = data.rows
    },
    async getDaysPart() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/days_participants')
      this.stats.days_participants = data.rows
    },
    async getLongestWins() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/longest_win')
      this.stats.longest_win = data.rows
    },
    async getMostPhotos() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_photos')
      this.stats.most_photos = data.rows
    },
    async getLongestLeader() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/longest_leader')
      this.stats.longest_leader = data.rows
    },
    async getFinishers() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/finishers')
      this.stats.finishers = data.rows
    },
    async getMostLeader() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_leader')
      this.stats.most_leader = data.rows
    },
    async getMostWin() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_win')
      this.stats.most_win = data.rows
    },
    async getAverageUpvotes() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/average_upvotes')
      this.stats.average_upvotes = data.rows
    },
    async getAvgs() {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/avgs')
      this.stats.avgs = data
    },
    async getFirst( interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/firstplaces?interval=' + interval)
      this.firsters =  data.rows
    },
    async resetPeriodStats() {
      this.periodStats= {
            'least_participants':[],
            'max_participants':[],
            'longest_streaks':[],
            'days_participants':[],
            'participants':[],
            'most_photos':[],
            'average_upvotes':[],
            'best_works':[],
            'controversial_works':[],
            'worst_works':[],
            'longest_win':[],
            'longest_leader':[],
            'finishers': [],
            'most_leader':[],
            'most_win':[],
            'avgs':{},
      }
    },
    async getBestStatsForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/best_works?interval=' + interval)
      return data.rows
    },
    async getWorseStatsForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/worst_works?interval=' + interval)
      return data.rows
    },
    async getControversialStatsForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/controversial_works?interval=' + interval)
      return data.rows
    },
    async getMostForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_participants?interval=' + interval)
      return data.rows
    },
    async getLeastForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/least_participants?interval=' + interval)
      return data.rows
    },
    async getMostPhotosForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_photos?interval=' + interval)
      return data.rows
    },
    async getMostLeaderForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_leader?interval=' + interval)
      return data.rows
    },
    async getMostWinForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/most_win?interval=' + interval)
      return data.rows
    },
    async getAverageUpvotesForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/average_upvotes?interval=' + interval)
      return data.rows
    },
    async getAvgsForInterval(interval: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/stats/avgs?interval=' + interval)
      return data
    },
    async getPeriodStats(interval: string) {
      await this.resetPeriodStats();
      this.periodStats.best_works = await this.getBestStatsForInterval(interval);
      this.periodStats.worst_works = await this.getWorseStatsForInterval(interval);
      this.periodStats.controversial_works = await this.getControversialStatsForInterval(interval);
      this.periodStats.least_participants = await this.getLeastForInterval(interval);
      this.periodStats.max_participants = await this.getMostForInterval(interval);
      this.periodStats.most_photos = await this.getMostPhotosForInterval(interval);
      this.periodStats.average_upvotes = await this.getAverageUpvotesForInterval(interval);
      this.periodStats.most_win = await this.getMostWinForInterval(interval);
      this.periodStats.most_leader = await this.getMostLeaderForInterval(interval);
      this.periodStats.avgs = await this.getAvgsForInterval(interval);
      /*
      await this.getLongest();
      await this.getDaysPart();
      await this.getBestStats();
      await this.getMostPhotos();
      await this.getWorseStats();
      await this.getLongestWins();
      await this.getLongestLeader();
      await this.getFinishers();
      await this.getMostLeader();
      await this.getMostWin();
      await this.getAvgs();
      await this.getControversialStats();*/
    },
    async getStats() {
      let interval = '';
      await this.getLongest();
      await this.getDaysPart();
      await this.getLongestWins();
      await this.getLongestLeader();
      await this.getFinishers();
      this.stats.avgs = await this.getAvgsForInterval(interval);
      this.stats.least_participants = await this.getLeastForInterval(interval);
      this.stats.max_participants = await this.getMostForInterval(interval);
      this.stats.most_photos = await this.getMostPhotosForInterval(interval);
      this.stats.best_works = await this.getBestStatsForInterval(interval);
      this.stats.worst_works = await this.getWorseStatsForInterval(interval);
      this.stats.controversial_works = await this.getControversialStatsForInterval(interval);
      this.stats.average_upvotes = await this.getAverageUpvotesForInterval(interval);
      this.stats.most_win = await this.getMostWinForInterval(interval);
      this.stats.most_leader = await this.getMostLeaderForInterval(interval);
    },
    // since we rely on `this`, we cannot use an arrow function
    async getBest(limit: any, seed: number) {
      if (!limit) limit = 20
      const { data } = await axios ('https://f365.zyuhel.ru/api/best?limit=' + limit + '&seed='+seed)
      this.best = data.rows
    },
    async sortBy(field: string, sortAsc: boolean) {
      if (this.currentUser) {
        this.currentUser = this.currentUser.sort(function (a,b) {
          if (sortAsc)
            return a[field]-b[field]
          else
            return b[field]-a[field]
        })
      }
    },
    async sortByControversial() {
      if (this.currentUser) {
        this.currentUser = this.currentUser.sort(function (a,b) {
          let a_compare = (a['upvotes']+a['downvotes'])*Math.min(a['upvotes'],a['downvotes'])/Math.max(a['upvotes'],a['downvotes']);
          let b_compare = (b['upvotes']+b['downvotes'])*Math.min(b['upvotes'],b['downvotes'])/Math.max(b['upvotes'],b['downvotes']);
          //hack for sorting so that photos without upvotes and downvotes were correctly shown in the end of list
          if (isNaN(a_compare)) a_compare=-10;
          if (isNaN(b_compare)) b_compare=-10;
          return b_compare-a_compare
        })
      }
    },
    async getForUser(user: string) {
      this.currentUser = [];
      const { data } = await axios ('https://f365.zyuhel.ru/api/username/' + user)
      this.currentUser = data.rows
      this.currentUserLinks = data.links
      await this.getForUserStats(user)
    },
    async getForUserStats(user: string) {
      this.currentUserStats = {};
      const { data } = await axios ('https://f365.zyuhel.ru/api/username/' + user + '/stats')
      this.currentUserStats = data
    },
    async searchFor(username: string) {
      if (!username) {
          this.searchResults=[];
          return;
      }
      const { data } = await axios ('https://f365.zyuhel.ru/api/searchuser/' + username)
      this.searchResults = data.rows
    },
    async getForDay(date: string) {
      const { data } = await axios ('https://f365.zyuhel.ru/api/day/' + date)
      this.currentDay = data.rows
    },
  }
})
