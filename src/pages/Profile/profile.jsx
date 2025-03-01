import Nav from '../../components/Navbar/Nav';
import Footer from '../../components/Footer/Footer';
import User from '../../components/User/User';
import Account from '../../components/Account/Account';

function Profile() {
    return (
        <>
            <Nav />
            <User />
            <main className="main bg-dark">
                <h2 className="sr-only">Accounts</h2>
                <Account
                    title="Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank Savings (x6712)"
                    amount="$10,928.42"
                    description="Available Balance"
                />
                <Account
                    title="Argent Bank Credit Card (x8349)"
                    amount="$184.30"
                    description="Current Balance"
                />
            </main>
            <Footer />

        </>
    );
}

export default Profile;