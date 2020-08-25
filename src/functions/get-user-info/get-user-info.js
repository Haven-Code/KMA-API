// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const CMC = require("cmcsoft-iu")({ HOST_API: "http://qldt.actvn.edu.vn" })

const HEAD = {
	'Access-Control-Allow-Origin': "*",
	'Access-Control-Allow-Methods': "GET, POST,OPTIONS,DELETE,PUT",
	"Access-Control-Allow-Credentials": true
}

exports.handler = async (event, context) => {
	// if (event.httpMethod !== "POST" || event.httpMethod !== "OPTIONS") return { statusCode: 500, body: JSON.stringify({ code: "ERROR PROTOCAL", message: "Invalid Method" }) }

	try {
		//const rqBody = event.queryStringParameters
		const rqBody = JSON.parse(event.body)

		console.log(event.body)

		try {

			const api = await CMC({ user: rqBody.username, pass: rqBody.password })
			const studentInfo = await api.studentProfile.show()
			const schedule = await api.studentTimeTable.showTimeTable()

			let data = {
				studentInfo: studentInfo,
				schedule: schedule
			}

			return {
				statusCode: 200,
				headers: HEAD,
				body: JSON.stringify({ code: "SUCCESS", data: data })
			}


		} catch (err) {
			return {
				statusCode: 500,
				headers: HEAD,
				body: JSON.stringify({ code: "ERROR", message: err })
			}
		}

	} catch (err) {
		return  {
			statusCode: 500,
			headers: HEAD,
			body: JSON.stringify({ code: "ERROR", message: err })
		}

	}
}
