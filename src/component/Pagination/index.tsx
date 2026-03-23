import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center gap-4 mt-6">
      <div>
        {page} / {totalPages}
      </div>
      <nav
        aria-label={t("pagination.label")}
        className="flex items-center justify-center gap-2"
      >
        {page > 1 ? (
          <Link
            className="btn"
            to={`?page=${page - 1}`}
            aria-label={t("pagination.previous")}
          >
            &laquo;
          </Link>
        ) : (
          <span
            className="btn opacity-50 cursor-default"
            aria-disabled="true"
            aria-label={t("pagination.previous")}
          >
            &laquo;
          </span>
        )}
        {[...Array(totalPages)]
          .map((_, i) => i + 1)
          .map((p) =>
            p === page ? (
              <span
                key={p}
                className="btn opacity-50 cursor-default"
                aria-current="page"
                aria-label={t("pagination.page", { n: p })}
              >
                {p}
              </span>
            ) : (
              <Link
                key={p}
                className="btn"
                to={`?page=${p}`}
                aria-label={t("pagination.goToPage", { n: p })}
              >
                {p}
              </Link>
            ),
          )}
        {page < totalPages ? (
          <Link
            className="btn"
            to={`?page=${page + 1}`}
            aria-label={t("pagination.next")}
          >
            &raquo;
          </Link>
        ) : (
          <span
            className="btn opacity-50 cursor-default"
            aria-disabled="true"
            aria-label={t("pagination.next")}
          >
            &raquo;
          </span>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
