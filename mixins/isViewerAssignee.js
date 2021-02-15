export default {
	computed: {
		isViewerAssignee() {
			if (!this.nextStep.assignee) {
				return false
			}
			if (this.viewer.id == this.nextStep.assignee.id) {
				return true
			}
		}
	}
}
