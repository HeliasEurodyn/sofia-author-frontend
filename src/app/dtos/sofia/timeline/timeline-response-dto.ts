import {TimelineDTO} from './timeline-dto';
import {TimelineContentDTO} from './timeline-content-dto';

export class TimelineResponseDTO {

  timelineDTO: TimelineDTO;
  resultList: Array<TimelineContentDTO>;
}
