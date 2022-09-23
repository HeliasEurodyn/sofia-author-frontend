import {TimelineContentDTO} from './timeline-content-dto';

export class TimelineResponseDTO {

  isTheLastPage: boolean;
  resultList: Array<TimelineContentDTO>;
}
