import server from '@/api/server'

export default function() {
  const access_token = localStorage.getItem('access_token')
  return server.get('user/checksession', { headers: { access_token } })
}
