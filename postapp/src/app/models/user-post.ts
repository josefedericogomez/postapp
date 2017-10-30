import { Post } from './post';
import { User } from './user';

export class UserPost { 
    post: Post;
    user: User;
    hasMyLike: boolean;
}