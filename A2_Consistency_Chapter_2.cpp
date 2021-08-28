#include <bits/stdc++.h>
using namespace std;
#define ll long long
const ll mod = 1000000007;
#define eb emplace_back
#define ff first
#define ss second
#define fora(ds) for (auto &it : ds)
#define forn(i, st, n) for (ll i = st; i < n; ++i)
#define forin(i, n, ed) for (ll i = n - 1; i >= ed; --i)
#define vcl vector<ll>
#define sortall(ds) sort(ds.begin(), ds.end());
#define s(val) val << " "
#define dbg cout << "Ok" << endl;

#define fastio                        \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL);

ostream &operator<<(ostream &os, vcl V)
{
    fora(V) cout << s(it);
    cout << endl;
    return os;
}

void solution()
{
    int n, k;
    string s, temp;
    cin >> s >> k;
    map<char, char> replace;
    for (int i = 0; i < k; i += 1)
    {
        cin >> temp;
        replace[temp[i]]
    }
}

int main()
{
    fastio;
    ll t;
    cin >> t;
    forn(i, 0, t) cout << "Case #" << (i + 1) << ": " << solution();
    return 0;
}