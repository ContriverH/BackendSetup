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

int solution()
{
    int n, mxVowel, mxConso, cntVowel, cntConso;
    string s;
    cin >> s;

    n = s.size();

    vector<int> letter(26, 0);

    for (int i = 0; i < n; i += 1)
    {
        letter[s[i] - 'A'] += 1;
    }

    mxVowel = mxConso = cntVowel = cntConso = 0;
    for (int i = 0; i < 26; i += 1)
    {
        if (letter[i])
        {
            if (i == 0 or i == 4 or i == 8 or i == 14 or i == 20)
            {
                mxVowel = max(mxVowel, letter[i]);
                cntVowel += letter[i];
            }
            else
            {
                mxConso = max(mxConso, letter[i]);
                cntConso += letter[i];
            }
        }
    }

    int res = (n - mxConso + (cntConso - mxConso));
    res = min(res, (n - mxVowel + (cntVowel - mxVowel)));
    return res;
}

int main()
{
    fastio;
    ll t;
    cin >> t;
    forn(i, 0, t) cout << "Case #" << (i + 1) << ": " << solution() << endl;
    return 0;
}