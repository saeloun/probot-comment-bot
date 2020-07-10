import { Application } from 'probot' // eslint-disable-line no-unused-vars

const extractAssignee = (body: String) =>{
    const regex = /@[\w-]+\s_(a|A)/g;
    const assigneeComment = body.match(regex);
    if(!!assigneeComment){
        const assignee = assigneeComment[0]
        return [assignee.substr(1, assignee.length - 3)];
    }else {
        return null
    }
}

// For more information on building apps:
// https://probot.github.io/docs/

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/

export = (app: Application) => {
  app.on('issue_comment', async (context) => {
      console.log("Payload Comment Body", extractAssignee(context.payload.comment.body))
      const assignees = extractAssignee(context.payload.comment.body)

      if (!!assignees){
          // First remove all existing assignees
          const currentAssignees = await context.github.issues.listAssignees(context.issue())
          await context.github.issues.removeAssignees(context.issue({assignees: currentAssignees.data.map(user => user.login)}))
          // Then assign new ones
          const newAssignee = context.issue({assignees: assignees});
          await context.github.issues.addAssignees(newAssignee)
      }
  })

    app.on('issue', async (context) => {
        console.log("Payload", context.payload)
        // const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
        // await context.github.issues.createComment(issueComment)
    })

}
