// import {
//     MdFirstPage,
//     MdLastPage,
//     MdChevronRight,
//     MdChevronLeft,
//   } from "react-icons/md";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Grid } from '@mui/material';
export function Pagination({
    gotoFirstPage,
    gotoLastPage,
    handlePageBackward,
    handlePageForward,
    pagination,
    page,
    limit,
}) {
    const { range, total, current, rows } = pagination;
    return (
        <Grid container spacing={1} justifyContent='flex-end'>
            <Grid item>
                <div className="mx-5">{rows} rows </div>
            </Grid>
            <Grid item>

                <FirstPageIcon
                    size="1.5em"
                    className={`${page === 1 && `pointer-events-none opacity-50`
                        } cursor-pointer`}
                    onClick={gotoFirstPage}
                />
            </Grid>
            <Grid item>
                <NavigateBeforeIcon
                    size="1.5em"
                    className={`${page === 1 && `pointer-events-none opacity-50`
                        } cursor-pointer`}
                    onClick={handlePageBackward}
                />
            </Grid>
            <Grid item>
                <div className="mx-4">
                    {range} of {total}
                </div>

            </Grid>
            <Grid item>
                <NavigateNextIcon
                    size="1.5em"
                    className={`${current >= total && `pointer-events-none opacity-50`
                        } cursor-pointer`}
                    onClick={handlePageForward}
                />
            </Grid>
            <Grid item>
                <LastPageIcon
                    size="1.5em"
                    className={`${current >= total && `pointer-events-none opacity-50`
                        } cursor-pointer`}
                    onClick={gotoLastPage}
                />
            </Grid>
        </Grid>
    );
}
