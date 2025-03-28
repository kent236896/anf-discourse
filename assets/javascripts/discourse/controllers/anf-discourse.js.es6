import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  currentUser: null,
  serverTime: null,
  stats: null,
  
  formattedTime: computed('serverTime', function() {
    if (!this.serverTime) return '';
    
    // 美化时间显示
    const date = new Date(this.serverTime);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }),
  
  dailyVisits: computed('stats', function() {
    return this.stats ? this.stats.daily_visits : 0;
  }),
  
  totalUsers: computed('stats', function() {
    return this.stats ? this.stats.total_users : 0;
  }),
  
  onlineUsers: computed('stats', function() {
    return this.stats ? this.stats.online_users : 0;
  }),
  
  newMessages: computed('stats', function() {
    return this.stats ? this.stats.new_messages : 0;
  })
}); 