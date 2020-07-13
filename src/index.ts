import {Application} from 'probot' // eslint-disable-line no-unused-vars
import {trim, isEqual} from "lodash";

const extractAssignee = (body: String) => {
    const regex = /@[\w-]+\s_(a|A)/g;
    const assigneeComment = body.match(regex);
    if (!!assigneeComment) {
        const assigneeStr = assigneeComment[0]
        return [trim(assigneeStr.split(" ")[0].replace("@", ""))];
    } else {
        return []
    }
}

// For more information on building apps:
// https://probot.github.io/docs/

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/

export = (app: Application) => {
    app.on('issue_comment', async (context) => {
        console.log("Payload Comment Body", extractAssignee(context.payload.comment.body))
        const newAssignees = extractAssignee(context.payload.comment.body)

        if (newAssignees.length > 0) {
            // First remove all existing assignees
            const currentIssue = await context.github.issues.get(context.issue())
            const currentAssignees = await currentIssue.data.assignees.map(user => user.login)
            if (isEqual(currentAssignees, newAssignees)) {
                console.log("Already assigned, doing nothing.")
                // Do nothing
            } else {
                // Remove all existing assignee
                await context.github.issues.removeAssignees(context.issue({assignees: currentIssue.data.assignees.map(user => user.login)}))
                // Then assign new ones
                const newAssignee = context.issue({assignees: newAssignees});
                await context.github.issues.addAssignees(newAssignee)
            }

        }
    })
}
