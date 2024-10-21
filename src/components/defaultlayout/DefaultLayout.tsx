import { ReactNode } from 'react';
import { StyledDefaultLayout } from './DefaultLayout.Styled';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

type DefaultLayoutProps = {
    children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <StyledDefaultLayout.Container>
            <StyledDefaultLayout.Header>
                <StyledDefaultLayout.HeaderContent>
                    <StyledDefaultLayout.Logo>
                        <BiSolidMoviePlay size={40} color="#fff" />
                        <StyledDefaultLayout.Title>
                            Live Search Movies
                        </StyledDefaultLayout.Title>
                    </StyledDefaultLayout.Logo>
                    <StyledDefaultLayout.Menu>
                        <StyledDefaultLayout.MenuItem
                            as={NavLink}
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Filmes favoritos
                        </StyledDefaultLayout.MenuItem>
                        <StyledDefaultLayout.MenuItem
                            as={NavLink}
                            to="/Movies"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            Todos os filmes
                        </StyledDefaultLayout.MenuItem>
                    </StyledDefaultLayout.Menu>
                </StyledDefaultLayout.HeaderContent>
            </StyledDefaultLayout.Header>
            <StyledDefaultLayout.Content>
                {children}
            </StyledDefaultLayout.Content>
        </StyledDefaultLayout.Container>
    );
}
