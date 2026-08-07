import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { PostsService, Post } from '../../services/posts.service';

@Component({
  selector: 'app-blog',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  isArticleOpen = false;
  selectedCategory: string | null = null;
  searchTerm = '';

  categories: string[] = [];
  articles: Post[] = [];
  filteredArticles: Post[] = [];
  paginatedArticles: Post[] = [];

  pageSize = 6;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.checkChildRoute();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkChildRoute());

    this.postsService.getPosts().subscribe((data) => {
      this.articles = data.posts;
      this.categories = data.categories.map((c) => c.name);

      this.route.queryParamMap.subscribe((params) => {
        this.selectedCategory = params.get('category');
        this.currentPage = 1;
        this.applyFilter();
      });
    });
  }

  filterByCategory(category: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: category ? { category } : {},
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private applyFilter(): void {
    let result = this.selectedCategory
      ? this.articles.filter((a) => a.category === this.selectedCategory)
      : this.articles;

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (a) => a.title.toLowerCase().includes(term) || a.excerpt.toLowerCase().includes(term),
      );
    }

    this.filteredArticles = result;
    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredArticles.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(start, start + this.pageSize);
  }

  private checkChildRoute(): void {
    this.isArticleOpen = !!this.route.firstChild;
  }
}
