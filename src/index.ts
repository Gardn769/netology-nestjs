import { from } from "rxjs";
import { map } from "rxjs/operators";
import axios from "axios";

const githubStream$ = from(
  axios.get("https://api.github.com/search/repositories?q=ndtnf-homeworks")
).pipe(
  map((response) => {
    return response.data.items;
  })
);

githubStream$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => {
    console.log("completed");
  },
});

const gitlubStream$ = from(
  axios.get("https://gitlab.com/api/v4/projects?search=nodejs")
);

gitlubStream$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => {
    console.log("completed");
  },
});
