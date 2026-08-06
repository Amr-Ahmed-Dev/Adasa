// src/app/services/posts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; avatar: string; role: string };
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}
export interface PostsData {
  posts: Post[];
  categories: Category[];
  siteInfo: any;
}
export interface Category {
  name: string;
  count: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostsData> {
    return this.http.get<PostsData>('/data/posts.json');
  }
}
