const axios = require('axios')

axios({
	url: 'https://httpbin.org/get',
	method: 'get',
	params: {
		key: 'value'
	}
})
	.then(result => console.log(result.data))
	.catch(console.log)
