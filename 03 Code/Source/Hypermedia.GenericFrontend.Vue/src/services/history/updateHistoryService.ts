import LinkHistory from '@/domain/history/linkHistory';

export default class UpdateHistoryService {
  public static update(linkHistory: LinkHistory, hyperlink: string): LinkHistory {
    const index = linkHistory.hyperlinks.findIndex((l) => l === hyperlink);
    if (index === -1) {
      return new LinkHistory([...linkHistory.hyperlinks, hyperlink]);
    } else {
      return new LinkHistory(linkHistory.hyperlinks.slice(0, index + 1));
    }
  }
}
