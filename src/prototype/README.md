# PROTOTYPE: portfolio design directions

Question: what should the portfolio look and move like?
Four directions, same real content (`data.ts`), same three pages each:

| Key | Direction | Routes |
| --- | --- | --- |
| a | Engineer's notebook | `src/pages/prototype/a/` + `src/prototype/variants/a/` |
| b | Systems console | `src/pages/prototype/b/` + `src/prototype/variants/b/` |
| c | Editorial magazine | `src/pages/prototype/c/` + `src/prototype/variants/c/` |
| d | Playful interactive | `src/pages/prototype/d/` + `src/prototype/variants/d/` |

Run `pnpm prototype`, open `/prototype`. The floating bar (dev only) or ← → flips directions on the same page.
Throwaway: once a direction wins, rebuild it properly in the real routes and move this folder to a `prototype/directions` branch.
