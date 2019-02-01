""""""""""""""""""""""
" PLUGIN INSTALATION
call plug#begin('~/.vim/plugged')

" color schemas
Plug 'morhetz/gruvbox'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

" auto complition
" Plug 'Valloric/YouCompleteMe'

" git integration
Plug 'tpope/vim-fugitive'
" Plug 'airblade/vim-gitgutter'

"Tree
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
" " Plug 'kien/ctrlp.vim'

"Folding
Plug 'tmhedberg/SimpylFold'

" web plugins
Plug 'rstacruz/sparkup'

" snipptes
Plug 'honza/vim-snippets'
Plug 'MarcWeber/vim-addon-mw-utils'
Plug 'tomtom/tlib_vim'
Plug 'garbas/vim-snipmate'

" quotes surrounding
Plug 'tpope/vim-surround'
Plug 'jiangmiao/auto-pairs'

call plug#end()

" Some default settings
set number numberwidth=1
set showcmd
set expandtab
set tabstop=2
set shiftwidth=2
set hlsearch
set incsearch
set splitbelow
set splitright
set nowrap
set noswapfile


" Visual customizing
set background=dark
colorschem gruvbox
set colorcolumn=80
let g:airline_theme='wombat'

" Mapping
let mapleader = " "
nnoremap H ^
nnoremap L $
inoremap jk <esc>
nnoremap ; :
nnoremap Q :q!<esc>
nnoremap <C-n> :NERDTreeToggle<Cr>

" split navigation
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" enable folding
set foldmethod=indent
nnoremap <leader><leader> za
autocmd! BufWinLeave *.* mkview
autocmd! BufWinEnter *.* silent loadview
set nofoldenable

" copy/past shortcut
nnoremap <leader>p "+p
nnoremap <leader>y "+y
vnoremap <leader>y "+y

" python mapping
function! Run_py()
  let l:s=expand("%:p:h") . '/run_py'
  execute "source" . s
endfunction
nnoremap <F5> :execute "call Run_py()"<Cr>
nnoremap <F2> :execute "!python3 %"<Cr>
nnoremap <F8> :!pep8 %<Cr>

" PEP8 standart
au BufNewFile,BufRead *.py
    \ set tabstop=4 |
    \ set softtabstop=4 |
    \ set shiftwidth=4 |
    \ set textwidth=79 |
    \ set expandtab |
    \ set autoindent |
    \ set fileformat=unix

" tmux edit shortcuts
nnoremap <leader>et :vsplit $TMUXCONF<Cr>


" vimrc edit shortcuts
nnoremap <leader>ev :vsplit $MYVIMRC<Cr>
nnoremap <leader>sv :source $MYVIMRC<Cr>

augroup vim_edit
  autocmd!
  autocmd bufwritepost *.vimrc source %
  autocmd FileType vim nnoremap <C-_> mm^i" <esc>`m2l
augroup END

" fast save
nnoremap <C-s> :w<Cr>

" regular editing shortcuts
nnoremap <leader><Cr> :normal! o<esc>

" fix trailling spaces and some search mapping
nnoremap <leader>w :execute "match Error /\\v +$/"<Cr>
nnoremap <leader>W mm:execute "%s/\\v +$//g"<Cr>`m
nnoremap / /\v
nnoremap <leader>/ :nohlsearch<Cr>

" grep implementation
nnoremap <leader>g :grep -R nno *<cr>
