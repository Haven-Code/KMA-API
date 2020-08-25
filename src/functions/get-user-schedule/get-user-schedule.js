// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const CMC = require("cmcsoft-iu")({ HOST_API: "http://qldt.actvn.edu.vn" })

const returnSmt = (data) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ data: data })
	}
}

exports.handler = async (event, context) => {

	if (event.httpMethod != "POST") return { statusCode: 200, body: JSON.stringify({code: "ERROR", message: "Invalid Method"}) }

	try {
		// const username = event.queryStringParameters.username || ''
		// const password = event.queryStringParameters.password || ''

		const rqBody = JSON.parse(event.body)

		try {

			const api = await CMC({ user: rqBody.username, pass: rqBody.password })

			// const student = await api.studentProfile.show()
			const dpr = await api.studentTimeTable.showTimeTable()

			return {
				statusCode: 200,
				body: JSON.stringify({ code: "SUCCESS", data: dpr })
			}

		} catch (err) {
			return {
				statusCode: 200,
				body: JSON.stringify({ code: "ERROR", message: err })
			}
		}

	} catch (err) {
		return { statusCode: 500, body: err.toString() }
	}
}
