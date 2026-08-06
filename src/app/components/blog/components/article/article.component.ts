import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService, Post } from '../../../../services/posts.service';

interface ArticleSection {
  id: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  article: Post | undefined;
  intro = '';
  sections: ArticleSection[] = [];
  relatedArticles: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      this.postsService.getPosts().subscribe((data) => {
        this.article = data.posts.find((p) => p.slug === slug);

        if (this.article) {
          this.parseContent(this.article.content);

          this.relatedArticles = data.posts
            .filter((p) => p.category === this.article!.category && p.slug !== this.article!.slug)
            .slice(0, 3);
        }
      });
    });
  }

  private parseContent(content: string): void {
    const chunks = content.split(/\n##\s+/);

    this.intro = chunks[0].trim();

    this.sections = chunks.slice(1).map((chunk, index) => {
      const [title, ...bodyParts] = chunk.split('\n\n');
      return {
        id: `section-${index}`,
        title: title.trim(),
        body: bodyParts.join('\n\n').trim(),
      };
    });
  }
}
