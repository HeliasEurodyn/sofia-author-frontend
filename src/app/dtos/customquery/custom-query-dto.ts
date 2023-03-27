import {BaseDTO} from '../common/base-dto';
import {AccessControlDto} from '../security/access-control-dto';
import { TagDTO } from '../tag/tag-dto';

export class CustomQueryDTO extends BaseDTO {

    code: string

    name: string;

    query: string;

    accessControlEnabled: Boolean;

    accessControls: AccessControlDto[] = [];

    public tags: TagDTO[] = [];
}
