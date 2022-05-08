import Issue from '@/types/Issue';
//import Project from '@/types/Project';

export const ISSUE_KEY = 'issues';
export const PROJECT_KEY = 'projects';

export const Storage = {
  isExist: (window.localStorage !== undefined),

  getAllIssue() {
    if (!this.isExist) return;
    const data = window.localStorage.getItem(ISSUE_KEY);
    if (!data) return [];

    return JSON.parse(data);
  },

  addIssue(item: Issue) {
    if (!this.isExist) return;
    if (!item || !item.title) return { error: 'title', };

    const list = this.getAllIssue();
    list.push({ ...item, estimatedTime: 0, });

    window.localStorage.setItem(ISSUE_KEY, JSON.stringify(list));
  },

  getIssue(id: string) {
    if (!this.isExist) return;
    return this.getAllIssue().find((item: Issue) => item.id === id);
  },

  deleteIssue(id: string) {
    if (!this.isExist) return;

    const list = this.getAllIssue();
    const targetIndex = list.findIndex((item: Issue) => item.id === id);

    if (targetIndex < 0) return;
    list.splice(targetIndex, 1);

    console.log('after: ', list);

    window.localStorage.setItem(ISSUE_KEY, JSON.stringify(list));
  },
  
  updateIssue(target: Issue) {
    if (!this.isExist) return;

    const list = this.getAllIssue();
    const targetIndex = list.findIndex((item: Issue) => item.id === target.id);

    if (targetIndex < 0) return;
    const newList: Array<Issue> = list.map((issue: Issue) => issue.id === target.id ? {...target} : {...issue})

    window.localStorage.setItem(ISSUE_KEY, JSON.stringify(newList));
  },
};

export default Storage;
