// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const CMC = require("cmcsoft-iu")({ HOST_API: "http://qldt.actvn.edu.vn" })

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Methods': '*',
	'Access-Control-Max-Age': '2592000',
	'Access-Control-Allow-Credentials': 'true',
};

exports.handler = async (event, context) => {
	if (event.httpMethod != "POST") return { statusCode: 200, body: JSON.stringify({ code: "ERROR", message: "Invalid Method" }) }

	try {
		//const rqBody = event.queryStringParameters
		const rqBody = JSON.parse(event.body)

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
				headers,
				body: JSON.stringify({ code: "SUCCESS", data: data })
			}

		} catch (err) {
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify({ code: "ERROR", message: err })
			}
		}

	} catch (err) {
		return {
			statusCode: 500,
			headers,
			body: err.toString()
		}
	}
}
