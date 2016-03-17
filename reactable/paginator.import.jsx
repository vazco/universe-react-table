
function pageHref(num) {
    return `#page-${num + 1}`
}

export class Paginator extends React.Component {
    handlePrevious(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage - 1)
    }

    handleNext(e) {
        e.preventDefault();
        this.props.onPageChange(this.props.currentPage + 1);
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        if(this.props.currentPage > 0) {
            return <a className='reactable-previous-page'
                      href={pageHref(this.props.currentPage - 1)}
                      onClick={this.handlePrevious.bind(this)}>
                        Previous
                   </a>
        }
    }

    renderNext() {
        if(this.props.currentPage < this.props.numPages - 1) {
            return <a className='reactable-next-page'
                      href={pageHref(this.props.currentPage + 1)}
                      onClick={this.handleNext.bind(this)}>
                      Next
                   </a>
        }
    }

    renderPageButton(className, pageNum) {

        return <a className={className}
                  key={pageNum}
                  href={pageHref(pageNum)}
                  onClick={this.handlePageButton.bind(this, pageNum)}>
                  {pageNum + 1}
              </a>
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }
        let currentPage = this.props.currentPage;


        return (
            <tbody className="reactable-pagination">
                <tr>
                    <td colSpan={this.props.colSpan}>
                        {this.renderPrevious()}
                        {currentPage}
                        {this.renderNext()}
                    </td>
                </tr>
            </tbody>
        );
    }
}

