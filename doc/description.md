## Design principles for software planning tool

### Plan software using a hierarchical approach

1. **Everything is an Increment**. Every task is an increment of a larger task.
2. **Pervasive Visibility**. There is always a visible and immediate feedback on
  the status of an increment, no matter how large or small the increment is.
  * progress bars and percentage complete for increments
  * burndown charts for increments
  * tests with pass or fail status for programming tasks (smallest increments)
3. **Amplified Rewards**. Upon completing an increment, there must be amplified
  and rewarding feedback for doing so
  * Conscious constructive efforts should be taken to amplify the reward of
    completing an increment

### Amplify the completion reward for an increment in a constructive manner

+ Every time an increment is completed, it should update the progress bar of the
  increment, the increment's parent and the parent's parent, ad infinitum.
+ Visible checkmarks or "done badges" for completed increments
+ Each time an increment is completed, optionally share the "done badge" via
  some social platform, so as to have the reward of recognition for your efforts
+ Github and CI integrations so that every time you push a branch associated
  with an increment, the increment is automatically checkmarked and you get a
  rewarding notification that you can share

